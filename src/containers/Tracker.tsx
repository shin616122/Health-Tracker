import { useState } from 'react';
import useReactRouter from 'use-react-router';
import { createContainer } from 'unstated-next';
import { auth, firestore, firebase } from '../firebase/config';
import axios from 'axios';
import { TrackerRecordModel, MealRecordModel, SleepRecordModel, MedicineRecordModel } from '../Models/Models'
import { callNotifyMessage } from '../lib/callables';

export default createContainer(() => {
    const { history } = useReactRouter();
    const [trackerRecord, setTrackerRecord] = useState<TrackerRecordModel | undefined>(undefined);
    const [bedTime, setBedTime] = useState<Date | undefined>(undefined);
    const [wakeUpTime, setWakeUpTime] = useState<Date | undefined>(undefined);
    const [meals, setMeals] = useState<MealRecordModel[]>([]);
    const [medicines, setMedicines] = useState<MedicineRecordModel[]>([]);
    const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
    const [checkedInTime, setCheckedInTime] = useState<Date | undefined>(undefined);

    const createSleepRecord = async (sleepRecord: SleepRecordModel) => {
        try {
            auth.onAuthStateChanged(async user => {
                let trackerRecordData: TrackerRecordModel | undefined = undefined;
                if (user) {
                    const trackerRecordRef = firestore
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords').doc(sleepRecord.recordDateTime.toISOString().substr(0, 10));

                    let key = '';
                    switch (sleepRecord.recordType) {
                        case 0:
                            key = 'wakeUpTime';
                            break;
                        case 1:
                            key = 'bedTime';
                            break;
                        default:
                            console.error('CreateSleepRecord key error.')
                            break;
                    }

                    trackerRecordRef
                        .get()
                        .then(async (document) => {
                            trackerRecordData = document.data() as TrackerRecordModel;
                            if (!trackerRecordData) {
                                await trackerRecordRef.set({ [key]: sleepRecord.recordDateTime.toISOString() }, { merge: true });
                            }
                            else {
                                if (sleepRecord.recordType === 0) {
                                    await trackerRecordRef
                                        .set({ 'wakeUpTime': sleepRecord.recordDateTime.toISOString() }, { merge: true })
                                        .then(() => {
                                            setWakeUpTime(sleepRecord.recordDateTime);
                                        })
                                        .catch((error) => {
                                            alert(error);
                                        })
                                }

                                if (sleepRecord.recordType === 1) {
                                    await trackerRecordRef
                                        .set({ 'bedTime': sleepRecord.recordDateTime.toISOString() }, { merge: true })
                                        .then(() => {
                                            if (sleepRecord.recordDateTime.toISOString().substr(0, 10) === new Date().toISOString().substr(0, 10)) {
                                                setBedTime(sleepRecord.recordDateTime);
                                            }
                                        })
                                        .catch((error) => {
                                            alert(error);
                                        })
                                }
                            }

                        })
                        .finally(() => {
                            setTrackerRecord(trackerRecordData as TrackerRecordModel);
                        })
                }
            })
        } catch (err) {
            if (err.status === 401) {
                history.push('/login');
            }
        }
    }

    const createOrUpdateMealRecord = async (recordDate: Date, data: MealRecordModel) => {
        try {
            auth.onAuthStateChanged(async user => {
                let trackerRecordData: TrackerRecordModel | undefined = undefined;
                if (user) {
                    const trackerRecordRef = firestore
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords').doc(recordDate.toISOString().substr(0, 10));

                    trackerRecordRef
                        .get()
                        .then((document) => {
                            trackerRecordData = document.data() as TrackerRecordModel;
                            if (!trackerRecordData) {
                                trackerRecordRef.set({})
                            }
                        })
                        .then(() => {
                            trackerRecordRef
                                .update({ meals: firebase.firestore.FieldValue.arrayUnion(data) })
                                .then(() => {
                                    console.log('createMealRecord - Added To firestore')
                                    setMeals([...meals, data]);
                                })
                                .catch((error) => {
                                    alert(error);
                                });
                        })
                        .finally(() => {
                            setTrackerRecord(trackerRecordData as TrackerRecordModel);
                        })
                }
            })
        } catch (err) {
            if (err.status === 401) {
                history.push('/login');
            }
        }
    };

    const createOrUpdateMedicineRecord = async (recordDate: Date, data: MedicineRecordModel) => {
        try {
            auth.onAuthStateChanged(async user => {
                let trackerRecordData: TrackerRecordModel | undefined = undefined;
                if (user) {
                    const trackerRecordRef = firestore
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords').doc(recordDate.toISOString().substr(0, 10));

                    trackerRecordRef
                        .get()
                        .then((document) => {
                            trackerRecordData = document.data() as TrackerRecordModel;
                            if (!trackerRecordData) {
                                trackerRecordRef.set({})
                            }
                        })
                        .then(() => {
                            trackerRecordRef
                                .update({ medicines: firebase.firestore.FieldValue.arrayUnion(data) })
                                .then(() => {
                                    console.log('createMedicineRecord - Added To firestore')
                                    setMedicines([...medicines, data]);
                                })
                                .catch((error) => {
                                    alert(error);
                                });
                        })
                        .finally(() => {
                            setTrackerRecord(trackerRecordData as TrackerRecordModel);
                        })
                }
            })
        } catch (err) {
            if (err.status === 401) {
                history.push('/login');
            }
        }
    };

    const addPoints = async (points: number) => {
        try {
            auth.onAuthStateChanged(async user => {
                let trackerRecordData: TrackerRecordModel | undefined = undefined;
                let healthTrackerPoints = 0;

                if (user) {
                    const usersRef = firestore.collection('users');
                    usersRef
                        .doc(user.uid)
                        .get()
                        .then((document) => {
                            const userData = document.data()
                            if (userData) {
                                let checkInTime = new Date(userData.checkInTime)
                                console.log(checkInTime)

                                if (!userData.isCheckedIn) {
                                    const trackerRecordRef = firestore
                                        .collection('users').doc(user.uid)
                                        .collection('trackerRecords').doc(new Date().toISOString().substr(0, 10));

                                    healthTrackerPoints = Number(userData.healthTrackerPoints) + points;

                                    usersRef
                                        .doc(user.uid)
                                        .update({ healthTrackerPoints })
                                        .then(() => {
                                            console.log('Updated Points')

                                            trackerRecordRef
                                                .get()
                                                .then((document) => {
                                                    trackerRecordData = document.data() as TrackerRecordModel;
                                                    if (!trackerRecordData) {
                                                        trackerRecordRef.set({})
                                                    }
                                                })
                                                .then(async () => {
                                                    await trackerRecordRef
                                                        .update({ isCheckedIn: true, 'checkedInTime': new Date().toISOString() })
                                                        .then(() => {
                                                            console.log('Checked In');
                                                            setIsCheckedIn(true);
                                                            setCheckedInTime(new Date())
                                                        })
                                                        .catch((error) => {
                                                            alert(error);
                                                        });

                                                    await callNotifyMessage(userData.fullName);
                                                })
                                                .finally(() => {
                                                    setTrackerRecord(trackerRecordData as TrackerRecordModel);
                                                });
                                        })
                                }
                            }
                        })
                }
            })
        } catch (err) {
            throw err;
        };
    };

    const getTrackerRecord = async (selectedDate: Date) => {
        try {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    const trackerRecordRef = firestore
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords').doc(selectedDate.toISOString().substr(0, 10));

                    trackerRecordRef
                        .get()
                        .then((document) => {
                            const trackerRecordData = document.data()
                            setTrackerRecord(trackerRecordData as TrackerRecordModel)

                            if (trackerRecordData) {
                                if (trackerRecordData.wakeUpTime) {
                                    setWakeUpTime(new Date(trackerRecordData.wakeUpTime));
                                }
                                if (trackerRecordData.bedTime) {
                                    setBedTime(new Date(trackerRecordData.bedTime));
                                }
                                if (trackerRecordData.meals) {
                                    let sortedMeals = trackerRecordData.meals.sort((a: any, b: any) => (a.recordDateTime > b.recordDateTime) ? 1 : ((b.recordDateTime > a.recordDateTime) ? -1 : 0))
                                    setMeals(sortedMeals);
                                }
                                if (trackerRecordData.isCheckedIn) {
                                    setIsCheckedIn(trackerRecordData.isCheckedIn);
                                    setCheckedInTime(new Date(trackerRecordData.checkedInTime));
                                }
                            } else {
                                setWakeUpTime(undefined);
                                setBedTime(undefined);
                                setMeals([]);
                                setCheckedInTime(undefined);
                                setIsCheckedIn(false)
                            }
                        })
                        .catch((error) => {
                            alert(error);
                        });
                }
            })
        } catch (err) {
            if (err.status === 401) {
                history.push('/login');
            }
        }
    }

    return {
        createSleepRecord, getTrackerRecord, trackerRecord, setTrackerRecord, wakeUpTime, bedTime,
        createOrUpdateMealRecord, meals, isCheckedIn, addPoints, checkedInTime, createOrUpdateMedicineRecord
    };
});
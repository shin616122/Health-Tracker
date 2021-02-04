import { useState } from 'react';
import useReactRouter from 'use-react-router';
import { createContainer } from 'unstated-next';
import { firebase } from '../firebase/config';
import { TrackerRecordModel, MealRecordModel, SleepRecordModel } from '../Models/Models'

export default createContainer(() => {
    const { history } = useReactRouter();
    const [trackerRecord, setTrackerRecord] = useState<TrackerRecordModel | undefined>(undefined);
    const [bedTime, setBedTime] = useState<Date | undefined>(undefined);
    const [wakeUpTime, setWakeUpTime] = useState<Date | undefined>(undefined);
    const [meals, setMeals] = useState<MealRecordModel[]>([]);
    const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);

    const createSleepRecord = async (sleepRecord: SleepRecordModel) => {
        try {
            firebase.auth().onAuthStateChanged(async user => {
                let trackerRecordData: TrackerRecordModel | undefined = undefined;
                if (user) {
                    const trackerRecordRef = firebase.firestore()
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
                                            setBedTime(sleepRecord.recordDateTime);
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
            firebase.auth().onAuthStateChanged(async user => {
                let trackerRecordData: TrackerRecordModel | undefined = undefined;
                if (user) {
                    const trackerRecordRef = firebase.firestore()
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

    const addPoints = async (points: number) => {
        try {
            firebase.auth().onAuthStateChanged(async user => {
                let trackerRecordData: TrackerRecordModel | undefined = undefined;
                let chumaPoints = 0;

                if (user) {
                    const usersRef = firebase.firestore().collection('users');
                    usersRef
                        .doc(user.uid)
                        .get()
                        .then((document) => {
                            const userData = document.data()
                            if (userData) {
                                if (!userData.isCheckedIn) {
                                    const trackerRecordRef = firebase.firestore()
                                        .collection('users').doc(user.uid)
                                        .collection('trackerRecords').doc(new Date().toISOString().substr(0, 10));

                                    chumaPoints = Number(userData.chumaPoints) + points;

                                    usersRef
                                        .doc(user.uid)
                                        .update({ chumaPoints })
                                        .then(() => {
                                            console.log('Updated Chuma Points')

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
                                                        .update({ isCheckedIn: true })
                                                        .then(() => {
                                                            console.log('Checked In');
                                                            setIsCheckedIn(true);
                                                        })
                                                        .catch((error) => {
                                                            alert(error);
                                                        });
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

    const getTrackerRecord = async (today: Date) => {
        try {
            firebase.auth().onAuthStateChanged(async user => {
                if (user) {
                    const trackerRecordRef = firebase.firestore()
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords').doc(today.toISOString().substr(0, 10));

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
                                    setIsCheckedIn(trackerRecordData.isCheckedIn)
                                }
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
        createOrUpdateMealRecord, meals, isCheckedIn, addPoints
    };
});
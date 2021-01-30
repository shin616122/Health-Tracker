import { useState } from 'react';
import useReactRouter from 'use-react-router';
import { createContainer } from 'unstated-next';
import { firebase } from '../firebase/config';

interface TrackerRecordModel {
    bedTime: string;
    wakeUpTime: string;
    alcohol: boolean;
    meals: MealRecordModel[];
    createdDate: string
}

interface MealRecordModel {
    recordDateTime: string,
    mealType: number,
    images: string,
}

interface SleepRecordModel {
    recordDateTime: Date;
    recordType: number;
}

export default createContainer(() => {
    const { history } = useReactRouter();
    const [trackerRecord, setTrackerRecord] = useState<TrackerRecordModel | undefined>(undefined);
    const [bedTime, setBedTime] = useState<Date | undefined>(undefined);
    const [wakeUpTime, setWakeUpTime] = useState<Date | undefined>(undefined);
    const [meals, setMeals] = useState<MealRecordModel[]>([]);

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
                            key = 'bedTime';
                            break;
                        case 1:
                            key = 'wakeUpTime';
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
                                if (!trackerRecordData.bedTime && sleepRecord.recordType === 0) {
                                    trackerRecordRef
                                        .set({ 'bedTime': sleepRecord.recordDateTime.toISOString() }, { merge: true })
                                        .catch((error) => {
                                            alert(error);
                                        })
                                }

                                if (!trackerRecordData.wakeUpTime && sleepRecord.recordType === 1) {
                                    trackerRecordRef
                                        .set({ 'wakeUpTime': sleepRecord.recordDateTime.toISOString() }, { merge: true })
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
                                    setMeals(trackerRecordData.meals);
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
        createSleepRecord, getTrackerRecord, trackerRecord, wakeUpTime, bedTime,
        createOrUpdateMealRecord, meals
    };
});
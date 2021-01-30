import { useState } from 'react';
import useReactRouter from 'use-react-router';
import { createContainer } from 'unstated-next';
import { firebase } from '../firebase/config';

interface TrackerRecordModel {
    bedTime: string;
    wakeUpTime: string;
    alcohol: boolean;
    foodRecords: FoodRecordModel[];
    createdDate: string
}

interface FoodRecordModel {
    recordDate: string,
    mealType: number,
    images: string[],
}

interface SleepRecordModel {
    recordDateTime: Date;
    recordType: number;
    // createdDate: string
}

export default createContainer(() => {
    const { history } = useReactRouter();
    const [trackerRecord, setTrackerRecord] = useState<TrackerRecordModel | undefined>(undefined);
    const [bedTime, setBedTime] = useState<Date | undefined>(undefined);
    const [wakeUpTime, setWakeUpTime] = useState<Date | undefined>(undefined);

    const createSleepRecord = async (sleepRecord: SleepRecordModel) => {
        try {
            firebase.auth().onAuthStateChanged(async user => {
                if (user) {
                    const trackerRecordsRef = firebase.firestore()
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords');

                    let queryKey = '';

                    switch (sleepRecord.recordType) {
                        case 0:
                            queryKey = 'bedTime';
                            break;
                        case 1:
                            queryKey = 'wakeUpTime';
                            break;

                        default:
                            queryKey = '';
                            break;
                    }
                    console.log(sleepRecord.recordType);
                    let snapshot = await trackerRecordsRef.where(queryKey, '==', '').get();
                    console.log(snapshot.empty);

                    if (snapshot.empty) {
                        let data = {
                            [queryKey]: sleepRecord.recordDateTime.toISOString()
                        }
                        trackerRecordsRef
                            .doc(sleepRecord.recordDateTime.toISOString().substr(0, 10))
                            .set(data, { merge: true })
                            .then(() => {
                                // history.push('/login');
                            })
                            .catch((error) => {
                                alert(error);
                            });
                    }
                }
            })
        } catch (err) {
            if (err.status === 401) {
                history.push('/login');
            }
        }
    }

    const getTrackerRecord = async (today: Date) => {
        try {
            firebase.auth().onAuthStateChanged(async user => {
                if (user) {
                    const trackerRecordsRef = firebase.firestore()
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords').doc(today.toISOString().substr(0, 10));

                    trackerRecordsRef
                        .get()
                        .then((document) => {
                            // history.push('/login');
                            console.log(document.data())
                            const trackerRecordData = document.data()
                            setTrackerRecord(trackerRecordData as TrackerRecordModel)

                            if (trackerRecord) {
                                if (trackerRecord.wakeUpTime) {
                                    setWakeUpTime(new Date(trackerRecord.wakeUpTime));
                                }
                                if (trackerRecord.bedTime) {

                                    setBedTime(new Date(trackerRecord.bedTime));
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
        createSleepRecord, getTrackerRecord, trackerRecord, wakeUpTime, bedTime
    };
});
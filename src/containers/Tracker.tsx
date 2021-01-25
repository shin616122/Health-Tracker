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

export default createContainer(() => {
    const { history } = useReactRouter();

    const createSleepRecord = async (data: TrackerRecordModel) => {
        try {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const trackerRecordsRef = firebase.firestore()
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords');
                    trackerRecordsRef
                        .doc()
                        .set(data)
                        .then(() => {
                            history.push('/login');
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
        createSleepRecord
    };
});
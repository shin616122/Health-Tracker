import { useState } from 'react';
import useReactRouter from 'use-react-router';
import { createContainer } from 'unstated-next';
import { auth, firestore, firebase } from '../firebase/config';
import { LastWeekSleepTimeModel, LastWeekMealTimeModel, MealRecordModel } from '../Models/Models'
import { format, getUnixTime, parse } from 'date-fns'

export default createContainer(() => {
    const { history } = useReactRouter();
    const [lastWeekSleepTimes, setLastWeekSleepTimes] = useState<LastWeekSleepTimeModel[]>([])
    const [lastWeekMealTimes, setLastWeekMealTimes] = useState<LastWeekMealTimeModel[]>([])

    const getLastWeekSleepTimes = async (today: Date) => {
        try {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    const trackerRecordRef = firestore
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords');

                    // TODO
                    // if (lastWeekSleepTimes.length < 0) {
                    // if (lastWeekSleepTimes[lastWeekSleepTimes.length - 1].createdDate !== format(today, 'yyyy-MM-dd')) {
                    //     console.log(234)
                    // }
                    let lastSevenDayParameter = getLastSevenDay(today);

                    const snapshot = await trackerRecordRef
                        // .where(firebase.firestore.FieldPath.documentId(), 'in', lastSevenDayParameter)
                        .where(firebase.firestore.FieldPath.documentId(), 'in', lastSevenDayParameter)
                        .get();

                    let sleepTimeDatas: LastWeekSleepTimeModel[] = [];

                    snapshot.forEach(doc => {
                        let data = doc.data();
                        let sleepTimeData = { 'createdDate': doc.id, 'wakeUpTime': new Date(data.wakeUpTime).getHours().toString(), 'bedTime': new Date(data.bedTime).getHours().toString() };

                        sleepTimeDatas.push(sleepTimeData);
                    });
                    setLastWeekSleepTimes(sleepTimeDatas);
                    // }

                }
            })
        } catch (err) {
            if (err.status === 401) {
                history.push('/login');
            }
        }
    }

    const getLastWeekMealTimes = async (today: Date) => {
        try {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    const trackerRecordRef = firestore
                        .collection('users').doc(user.uid)
                        .collection('trackerRecords');

                    // TODO
                    // if (lastWeekSleepTimes.length < 0) {
                    // if (lastWeekSleepTimes[lastWeekSleepTimes.length - 1].createdDate !== format(today, 'yyyy-MM-dd')) {
                    //     console.log(234)
                    // }
                    let lastSevenDayParameter = getLastSevenDay(today);

                    const snapshot = await trackerRecordRef
                        .where(firebase.firestore.FieldPath.documentId(), 'in', lastSevenDayParameter)
                        .get();

                    let mealTimeDatas: LastWeekMealTimeModel[] = [];

                    snapshot.forEach(doc => {
                        let data = doc.data();
                        let meals = data.meals;
                        let mealTimeData = { 'createdDate': doc.id };
                        let key = ''
                        // console.log(data)
                        // console.log(meals)
                        // meals.forEach((meal: MealRecordModel) => {
                        //     switch (meal.mealType) {
                        //         case 0:
                        //             key = 'breakfastTime';
                        //             mealTimeData = { [key]: new Date(data.recordDateTime).getHours().toString(), ...mealTimeData };
                        //             break;
                        //         case 1:
                        //             key = 'lunchTime';
                        //             mealTimeData = { [key]: new Date(data.recordDateTime).getHours().toString(), ...mealTimeData };
                        //             break;
                        //         case 2:
                        //             key = 'dinnerTime';
                        //             mealTimeData = { [key]: new Date(data.recordDateTime).getHours().toString(), ...mealTimeData };
                        //             break;
                        //         default:
                        //             break;
                        //     }
                        // });

                        mealTimeDatas.push(mealTimeData);
                    });
                    console.log(mealTimeDatas)
                    setLastWeekMealTimes(mealTimeDatas);
                    // }

                }
            })
        } catch (err) {
            if (err.status === 401) {
                history.push('/login');
            }
        }
    }

    const getLastSevenDay = (today: Date) => {
        let lastSevenDays: string[] = [];

        lastSevenDays.push(format(today, 'yyyy-MM-dd'));
        for (let i = 1; i < 7; i++) {
            lastSevenDays.push(format(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i), 'yyyy-MM-dd'))
        }
        return lastSevenDays;
    }

    return {
        getLastWeekSleepTimes, lastWeekSleepTimes, getLastWeekMealTimes, lastWeekMealTimes
    };
});
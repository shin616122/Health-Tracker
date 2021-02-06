import { useState } from 'react';
import useReactRouter from 'use-react-router';
import { createContainer } from 'unstated-next';
import { firebase } from '../firebase/config';
import { LastWeekSleepTimeModel } from '../Models/Models'
import { format, getUnixTime, parse } from 'date-fns'

export default createContainer(() => {
    const { history } = useReactRouter();
    const [lastWeekSleepTimes, setLastWeekSleepTimes] = useState<LastWeekSleepTimeModel[]>([])

    const getLastWeekSleepTimes = async (today: Date) => {
        try {
            firebase.auth().onAuthStateChanged(async user => {
                if (user) {
                    const trackerRecordRef = firebase.firestore()
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

    const getLastSevenDay = (today: Date) => {
        let lastSevenDays: string[] = [];

        lastSevenDays.push(format(today, 'yyyy-MM-dd'));
        for (let i = 1; i < 7; i++) {
            lastSevenDays.push(format(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i), 'yyyy-MM-dd'))
        }
        return lastSevenDays;
    }

    return {
        getLastWeekSleepTimes, lastWeekSleepTimes
    };
});
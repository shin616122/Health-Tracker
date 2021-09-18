export interface TrackerRecordModel {
    bedTime: string;
    wakeUpTime: string;
    alcohol: boolean;
    isCheckedIn: boolean;
    meals: MealRecordModel[];
    createdDate: string
}

export interface MealRecordModel {
    recordDateTime: string,
    mealType: number,
    image: string,
}

export interface SleepRecordModel {
    recordDateTime: Date;
    recordType: number;
}

export interface MedicineRecordModel {
    recordDateTime: string,
    stomachMedicineType: number,
    mentalMedicineType: number,
    pillType: number,
    image: string,
}

export interface UserModel {
    uid: string;
    fullName: string;
    email: string;
    healthTrackerPoints: number;
}

export interface LoginFormModel {
    email: string;
    password: string;
}

export interface SignupFormModel {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LastWeekSleepTimeModel {
    createdDate: string,
    wakeUpTime: string,
    bedTime: string,
}

export interface LastWeekMealTimeModel {
    createdDate: string,
    breakfastTime?: string,
    lunchTime?: string,
    dinnerTime?: string
}
import {subtractHours} from "src/lib/date";
import {CommentWithChildren, IComment} from "./types";

export const sortByDate = (arr: {created: string}[]) => {
    arr.sort((a, b) => {
        if (new Date(a.created) > new Date(b.created)) return -1;
        if (new Date(a.created) < new Date(b.created)) return 1;
        return 0;
    });
};

// example: if 1 hour left since a comment has been sent, it should return '1 час назад'
export const calcPassedTime = (time: Date) => {
    const hours = (+new Date() - +time) / 1000 / 3600;
    if (hours >= 1 && hours < 24) {
        if (hours === 1 || hours === 21) return `${hours} час назад`;
        if (
            hours === 2 ||
            hours === 3 ||
            hours === 4 ||
            hours === 22 ||
            hours === 23
        )
            return `${hours} часа назад`;
        return `${hours} часов назад`;
    }
};

// console.log(calcPassedTime(subtractHours(new Date(), 0.5)));
// console.log(calcPassedTime(subtractHours(new Date(), 2)));
// console.log(calcPassedTime(subtractHours(new Date(), 4)));
// console.log(calcPassedTime(subtractHours(new Date(), 5)));
// console.log(calcPassedTime(subtractHours(new Date(), 6)));
// console.log(calcPassedTime(subtractHours(new Date(), 10)));
// console.log(calcPassedTime(subtractHours(new Date(), 11)));
// console.log(calcPassedTime(subtractHours(new Date(), 12)));
// console.log(calcPassedTime(subtractHours(new Date(), 20)));
// console.log(calcPassedTime(subtractHours(new Date(), 22)));
// console.log(calcPassedTime(subtractHours(new Date(), 23)));
// console.log(calcPassedTime(subtractHours(new Date(), 24)));
// console.log(calcPassedTime(subtractHours(new Date(), 25)));
// console.log(calcPassedTime(subtractHours(new Date(), 48)));

export function timeAgo(date: Date) {
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;

    const timeElapsed = Date.now() - date.getTime();

    if (timeElapsed < minute) {
        return "только что";
    } else if (timeElapsed < hour) {
        const minutesAgo = Math.round(timeElapsed / minute);
        return `${minutesAgo} ${declOfNum(minutesAgo, [
            "минуту",
            "минуты",
            "минут",
        ])} назад`;
    } else if (timeElapsed < day) {
        const hoursAgo = Math.round(timeElapsed / hour);
        return `${hoursAgo} ${declOfNum(hoursAgo, [
            "час",
            "часа",
            "часов",
        ])} назад`;
    } else {
        const dateFormat = new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
        return dateFormat.format(date);
    }
}

// Функция declOfNum возвращает нужную форму слова в зависимости от числа
function declOfNum(number: number, titles: string[]) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
    ];
}

console.log(timeAgo(subtractHours(new Date(), 0.1)));
console.log(timeAgo(subtractHours(new Date(), 2)));
console.log(timeAgo(subtractHours(new Date(), 4)));
console.log(timeAgo(subtractHours(new Date(), 5)));
console.log(timeAgo(subtractHours(new Date(), 6)));
console.log(timeAgo(subtractHours(new Date(), 10)));
console.log(timeAgo(subtractHours(new Date(), 11)));
console.log(timeAgo(subtractHours(new Date(), 12)));
console.log(timeAgo(subtractHours(new Date(), 20)));
console.log(timeAgo(subtractHours(new Date(), 22)));
console.log(timeAgo(subtractHours(new Date(), 23)));
console.log(timeAgo(subtractHours(new Date(), 24)));
console.log(timeAgo(subtractHours(new Date(), 25)));
console.log(timeAgo(subtractHours(new Date(), 48)));

// копирует массив объектов
export function createObjectList<P>(objectList: P[]) {
    const commentsWithChildren: P[] = [];
    objectList.forEach((item) =>
        commentsWithChildren.push(Object.assign({}, item)),
    );

    return commentsWithChildren;
}

// копирует элементы детей в объекты родителей
export function moveChildrenToParent(arr: IComment[]) {
    arr.forEach((comment) => {
        if (comment.parent) {
            const parent: CommentWithChildren | undefined = arr.find(
                (item) => item.id === comment.parent,
            );
            if (parent) {
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(comment);
            }
        }
    });
}

export const calcLikes = (arr: IComment[]) => {
    console.log("calc like");
    return arr.reduce((acc, current) => {
        return acc + current.likes;
    }, 0);
};

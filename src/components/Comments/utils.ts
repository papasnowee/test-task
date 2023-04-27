import { IComment } from 'src/api/comments/getCommentsRequest'
import { CommentWithChildren } from './types'

export const sortByDate = (arr: { created: string }[]) => {
    arr.sort((a, b) => {
        if (new Date(a.created) > new Date(b.created)) return -1
        if (new Date(a.created) < new Date(b.created)) return 1
        return 0
    })
}

export function timeAgo(date: Date) {
    const seconds = Math.floor((Number(new Date()) - Number(date)) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (seconds < 60) {
        return 'recently'
    } else if (seconds < 120) {
        return '1 second ago'
    } else if (seconds < 300) {
        return `${Math.floor(seconds / 60)} seconds ago`
    } else if (seconds < 3600) {
        return `${minutes} minutes ago`
    } else if (seconds < 7200) {
        return '1 hour ago'
    } else if (seconds < 86400) {
        return `${hours} hours ago`
    } else {
        // If more than a day has passed, return the date and time in US format
        const dateFormat = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'America/New_York',
        })
        return dateFormat.format(date)
    }
}

// копирует элементы детей в объекты родителей
export function moveChildrenToParent(arr: IComment[]) {
    arr.forEach((comment) => {
        if (comment.parent) {
            const parent: CommentWithChildren | undefined = arr.find((item) => item.id === comment.parent)
            if (parent) {
                if (!parent.children) {
                    parent.children = []
                }
                parent.children.push(comment)
            }
        }
    })
}

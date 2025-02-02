export function formatMinutes (minute: number) : string {
    switch (minute) {
        case 4:
            return "4 Mins"
        case 3:
            return "3 Mins"
        case 2.5:
            return "2 Min 30 Secs"
        case 2:
            return "2 Mins"
        case 1.5:
            return "1 Min 30 Secs"
        case 1:
            return "1 Min"
        case 0.5:
            return "30 Secs"
        default:
            return "None"
    }
}
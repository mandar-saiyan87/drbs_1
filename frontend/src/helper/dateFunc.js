export function dateFormat() {
    const currentIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    const datewoTime = currentIST.split(',')[0]
    const currentDate = datewoTime.split('/')
    return (`${currentDate[0]}/${currentDate[1]}`)
}

export function dobFormat(date) {
    return date
}
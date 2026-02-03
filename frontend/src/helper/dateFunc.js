export function dateFormat() {
    // const testdate = new Date("9/20/1995")
    const currentIST = new Date().toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        timeZone: 'Asia/Kolkata'
    })

    return currentIST
}

export function dobFormat(dob) {
    const dateObj = new Date(dob)

    const formatted = dateObj.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long'
    });

    return formatted
}
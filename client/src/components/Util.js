export const removeLeadingZero = (s) => {
    if (s.toString().charAt(0) === '0') {
        return s.toString().substring(1);
    } else {
        return Number(s);
    }
}
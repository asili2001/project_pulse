const validateInput = (value: string, type: "email" | "number" | "personal_number" | "phone_number") => {
    if (!value) return false;
    value = value?.toString();
    if (type === 'email') {
        // Check if the value is a valid email address using a simple regex pattern.
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(value);
    } else if (type === 'number') {
        // Check if the value is a string with at least minChars characters.
        return typeof value === 'number';
    } else if (type === "personal_number") {
        // Remove any non-numeric characters
        // const personalNumber = value.replace(/\D/g, '');

        const personalNumberRegex = /^(?:\d{10}|\d{12})$/;

        return personalNumberRegex.test(value);

    } else if (type === "phone_number") {
        const phoneRegex = /^\d{10,15}$/;

        return phoneRegex.test(value);
    }

    // Invalid type, return false.
    return false;
}

export default validateInput;

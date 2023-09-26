export default function validateInputs(event, setError=()=>{},callback) {

    const notNumbersRegex = /^[A-Za-z\s]*[A-Za-z]+$/;
    const onlyNumbersRegex = /^\s?\d+$/;
    const linkRegex = /^(http|https):\/\/\S+\.(jpg|jpeg|png|gif)$/i;
    setError({ state: false, message: "✔ No errors found" });
    const { name, value } = event.target;

    switch (name) {

        case "name":
            if (!notNumbersRegex.test(value)) {
                setError({ state: true, message: "Numbers are not allowed in this field" });
                if(value.length===0) callback(event);
                return false;
            }
            callback(event);
            return true;
        case "minHeight":
            if (!onlyNumbersRegex.test(value)) {
                setError({ state: true, message: "Only Numbers are allowed in this field" });
                if(value.length===0) callback(event);
                return false;
            }
            callback(event);
            return true;
        case "maxHeight":
            if (!onlyNumbersRegex.test(value)) {
                setError({ state: true, message: "Only Numbers are allowed in this field" });
                if(value.length===0) callback(event);
                return false;
            }
            callback(event);
            return true;
        case "minWeight":
            if (!onlyNumbersRegex.test(value)) {
                setError({ state: true, message: "Only Numbers are allowed in this field" });
                if(value.length===0) callback(event);
                return false;
            }
            callback(event);
            return true;
        case "maxWeight":
            if (!onlyNumbersRegex.test(value)) {
                setError({ state: true, message: "Only Numbers are allowed in this field" });
                if(value.length===0) callback(event);
                return false;
            }
            callback(event);
            return true;
        case "minLifespan":
            if (!onlyNumbersRegex.test(value)) {
                setError({ state: true, message: "Only Numbers are allowed in this field" });
                if(value.length===0) callback(event);
                return false;
            }
            callback(event);
            return true;
        case "maxLifespan":
            if (!onlyNumbersRegex.test(value)) {
                setError({ state: true, message: "Only Numbers are allowed in this field" });
                if(value.length===0) callback(event);
                return false;
            }
            callback(event);
            return true;
        case "image":
            if (!linkRegex.test(value)) {
                setError({ state: true, message: "Only valid link images and jpg(e), png & gif format are allowed" });
                if(value.length===0) callback(event);
                return false;
            }
            callback(event);
            return true;
        case "temperament":
            callback(event)
        break;
        default:
            setError({ state: true, message: "Ups... something went wrong, check your data" });
            return false;
    }
}
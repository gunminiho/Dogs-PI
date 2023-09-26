
export const average = (weightRange) => {
    const [min, max] = weightRange.split("-").map(Number);
    console.log(min);
    console.log(max);
    if(min && max)
    return (min + max) / 2;
    else
    return min;

}

//console.log(average("13"));

export default average;
// function sum (a, b) {
//     return a + b;
// }

// const sum = (a,b) => a + b;

export const Test = () => {
    const fruits = ["apple", "banana", "cherry"];

    return (
        <ul>
        {fruits.map((item) => (
            <li key = {item}> {item}</li>
        )
        )}
        </ul>
    )
}

export const Test2 = () =>{
    const students = [
        {
            id: 1,
            name : "John",
            age: 20
        },
        {
            id: 2,
            name: "precious",
            age: 22
        },
        {
            id:3,
            name: "Doe",
            age: 19
        }

    ];

    return(
        <div>
            <h2>Student list</h2>
            <ul>
                {students.map((item) =>(
                    <li key ={item.id}> {item.name} is {item.age} </li>
                ))}
            </ul>
        </div>
    )
}

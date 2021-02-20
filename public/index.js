/**
 * Class represents Student
 */
class Student {
    constructor(id, firstName, secondName, age, speciality) {
        this.id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.age = age;
        this.speciality = speciality;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    //Application constants
    const studentURL = `http://localhost:3000/students`;
    const studentForm = document.querySelector('#student-form');    
    //Last call timer
    let lastCall = 0;

    /**
     * Function return Student entity from form
     */
    function fromForm() {
        const id = studentForm['student-id'].value;
        const firstName = studentForm['student-firstname'].value;
        const secondName = studentForm['student-secondname'].value;
        const age = studentForm['student-age'].value;
        const speciality = studentForm['student-speciality'].value;
        const student = new Student(id,firstName,secondName,age,speciality);
        return student;
    }

    /**
     * Function set form inputs with student characteristics
     * @param {Student} student - entity of Student
     */
    function toForm(student) {
        studentForm['student-id'].value = student.id;
        studentForm['student-firstname'].value = student.firstName;
        studentForm['student-secondname'].value = student.secondName;
        studentForm['student-age'].value = student.age;
        studentForm['student-speciality'].value = student.speciality;
    }
    /**
     * Color designation of buttons click result
     * @param {string} color 
     */
    function signal(color) {
        switch(color) {
            case 'green': color = '120,255,120'; break;
            case 'red': color = '255,120,120'; break;
            default: return;
        }
        document.body.animate(
            [ // keyframes
                { backgroundColot: `rgba(${color},0)` },
                { backgroundColor: `rgba(${color},0.3)` },
                { backgroundColot: `rgba(${color},0)` },
            ], { // timing options
                duration: 700,
                iterations: 1
            })
    }
    /**
     * Fetch to first element of JSON file to first data when page loaded
     */
    fetch(`${studentURL}/first`)
        .then( response => {
            if (response.status == 200) {
                signal('green');
                return response.json()
            } else signal('red');
        })
        .then( student => {
            if(!student) return;
            const firstStudent = new Student(
                student.id,
                student.firstName,
                student.secondName,
                student.age,
                student.speciality
            );
            toForm(firstStudent);
        });

    /**
     * Fetch Get on ID Change
     */
    studentForm['student-id'].addEventListener('input', (e) => {
        if(e.target.value != '' && Date.now() - lastCall > 250) {
            fetch(`${studentURL}/${e.target.value}`)
            .then( response => {
                if (response.status == 200) {
                    signal('green');
                    return response.json()
                } //else signal('red');
            })
            .then( student => {
                if(!student) return;
                const curStudent = new Student(
                    student.id,
                    student.firstName,
                    student.secondName,
                    student.age,
                    student.speciality
                );
                toForm(curStudent);
            });
            lastCall = Date.now();        
        }
    });
    //Submit cancel default event
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    /**
     * Add attributes to form inputs
     */
    Array.from(studentForm.querySelectorAll('input[type="text"]'))
        .forEach( item => {
            item.setAttribute('autocomplete','off');
            item.setAttribute('required','true');
        });

    /**
     * Add event to form buttons
     */
    Array.from(studentForm.querySelectorAll('input[type="submit"],input[type="button"]'))
        .forEach(item => item.addEventListener('click', (e) => {
        if (Date.now() - lastCall < 250) {   
            if (e.target.dataset.action === 'prev') {
                /**
                 * Fetch to previous Student entity
                 */
                if(!studentForm['student-id'].value)
                    studentForm['student-id'].value = 0;
                fetch(`${studentURL}/${studentForm['student-id'].value}/prev`)
                    .then( response => {
                        if (response.status == 200) {
                            signal('green');
                            return response.json()
                        } else signal('red');
                    })
                    .then( student => {
                        if (!student) return;
                        const prevStudent = new Student(
                            student.id,
                            student.firstName,
                            student.secondName,
                            student.age,
                            student.speciality
                        );
                        toForm(prevStudent);                    
                    }); 
                lastCall = Date.now();
            } else if (e.target.dataset.action == 'next') {
                /**
                 * Fetch to next Student entity
                 */
                if(!studentForm['student-id'].value)
                    studentForm['student-id'].value = 0;
                fetch(`${studentURL}/${studentForm['student-id'].value}/next`)
                    .then( response => {
                        if (response.status == 200) {
                            signal('green');
                            return response.json()
                        } else signal('red');
                    })
                    .then( student => {
                        if (!student) return;
                        const nextStudent = new Student(
                            student.id,
                            student.firstName,
                            student.secondName,
                            student.age,
                            student.speciality
                        );
                        toForm(nextStudent);
                    }); 
                lastCall = Date.now();
            } else if(studentForm['student-id'].value) {
                if (e.target.dataset.action === 'insert') {
                    /**
                     * Fetch to create new Student entity
                     */
                    const newStudent = fromForm();
                    fetch(`${studentURL}`, {
                        method: 'POST',
                        body: JSON.stringify(newStudent),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        if(response.status == 200)
                        signal('green');
                        else 
                        signal('red');
                    });
                    lastCall = Date.now();
                } else if (e.target.dataset.action === 'edit') {
                    /**
                     * Fetch to edit Student entity
                     */
                    const editedStudent = fromForm();
                    fetch(`${studentURL}/${editedStudent.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(editedStudent),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        if(response.status == 200)
                        signal('green');
                        else 
                        signal('red');
                    });
                    lastCall = Date.now();
                } else if (e.target.dataset.action === 'delete') {
                    /**
                     * Fetch to delete Student entity
                     */
                    deletedStudent = fromForm();
                    fetch(`${studentURL}/${deletedStudent.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        if(response.status == 200)
                        signal('green');
                        else 
                        signal('red');
                    });
                    lastCall = Date.now();
                    studentForm.reset();
                }
            } else signal('red');
        }
    }));
});
const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    );
}

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map(item => <Part key={item.id} part={item} />)}
        </div>
    );
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    );
}

const Total = ({ course }) => {
    return (
        <p><strong>total of {course.parts.reduce((sum, parts) => sum + parts.exercises, 0)} exercises</strong> </p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            {course.map((course) => {
                return (
                    <div key={course.id}>
                        <Header course={course} />
                        <Content course={course} />
                        <Total course={course} />
                    </div>
                )
            })}
        </div>
    )
}

export default Course;
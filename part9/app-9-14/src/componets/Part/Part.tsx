import { CoursePart } from "../../types";


/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

interface PartProps{
    coursePart: CoursePart;
}

const Part = ({coursePart}: PartProps) => {
        switch(coursePart.type){
         case "normal":
            return(
             
                <>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                    </p>
                    <p><i>{coursePart.description}</i></p>
                </>
            );
            
         break;
         case "groupProject":
            return(
                
                   <>
                        <p>
                            <b>
                                {coursePart.name} {coursePart.exerciseCount}
                            </b>
                        </p>
                        <p>project exercises: {coursePart.groupProjectCount}</p>
                   </>
                   
               );
         break;
         case "submission":
            return(      
                <>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                    </p>
                    <p><i>{coursePart.description}</i></p>
                    <p> submit to {coursePart.exerciseSubmissionLink}</p>
                </>      
            );
         break;

         case "special":
            return(
                <>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                    </p>
                    <p><i>{coursePart.description}</i></p>
                    <p>required skills: {coursePart.requirements.join(", ")}</p>
                </>
            );
         break;   
         default:
            assertNever(coursePart);
            return null;
         break;   
        }

}

export default Part;
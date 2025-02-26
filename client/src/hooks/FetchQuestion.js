import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

import { getServerData } from "../helper/helper";

import * as  Action from '../redux/question_reducer'

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading : false, apiata : [], serverError : null})

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        
        (async () => {
            try{

                const [{ questions, answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data);

                if(questions.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiata : questions}));
                
                    dispatch(Action.startExamAction({ question: questions, answers }));
                }else{
                    throw new Error("No Question Avalibale")
                }

            }
            catch(error){
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error.message}));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];

}


export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error)
    }
}


export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error)
    }
}


const QuestionsComponent = () => {
    const [{ isLoading, apiData, serverError }] = useFetchQuestion();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (serverError) {
        return <div>Error: {serverError}</div>; 
    }

    return (
        <div>
            {apiData.map((question, index) => (
                <div key={index}>
                    <h3>{question.questionText}</h3> 
                    
                </div>
            ))}
        </div>
    );
};

export default QuestionsComponent;
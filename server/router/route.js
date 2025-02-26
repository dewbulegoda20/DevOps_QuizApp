import { Router } from "express";
import * as controller from '../controllers/controller.js'; // Importing question/result-related controllers


const router = Router();


/** Questions Routes API */
router.route('/questions')
    .get(controller.getQuestions)   /** GET Request to fetch questions */
    .post(controller.insertQuestions)  /** POST Request to insert questions */
    .delete(controller.dropQuestions)  /** DELETE Request to remove questions */

/** Result Routes API */
router.route('/result')
    .get(controller.getResult)    /** GET Request to fetch quiz results */
    .post(controller.storeResult) /** POST Request to store results */
    .delete(controller.dropResult) /** DELETE Request to delete results */



export default router;



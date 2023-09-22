import * as React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import {ListQuizPage} from "./pages/quizzes/list-quiz.page";

export const pagesRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <ListQuizPage/>
        ),
    },
    {
        path: "about",
        element: <div>About</div>,
    },
]);

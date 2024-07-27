import { Score } from "../../tools/fetch";

export const fisherYatesShuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


export const top_10 = ({scores, setScores} : {scores: Score[], setScores: (scores: Score[]) => void }) => {
const sortedScores = [...scores].sort((a, b) => a.time - b.time);
setScores(sortedScores);
};

export const last_10 = ({scores, setScores} : {scores: Score[], setScores: (scores: Score[]) => void }) => {
const sortedScores = [...scores].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
});
setScores(sortedScores);
};
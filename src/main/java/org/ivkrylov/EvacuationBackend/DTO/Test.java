package org.ivkrylov.EvacuationBackend.DTO;

import lombok.Getter;
import lombok.Setter;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Answers;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Tests;

import java.util.ArrayList;
import java.util.Optional;

@Getter
@Setter
public class Test{
    private Tests test;
    private ArrayList<Questions> questions;
    private ArrayList<Answers> answers;

    public Tests getTest() {
        return test;
    }

    public ArrayList<Questions> getQuestions() {
        return questions;
    }

    public ArrayList<Answers> getAnswers() {
        return answers;
    }

    public Test(){
        test = new Tests();
        questions = new ArrayList<Questions>(10);
        answers = new ArrayList<Answers>(3 * 10);

        for (int i = 0; i < 10; i++) {
            questions.add(i, new Questions(test));
            for (int j = 0; j < 3; j++){
                answers.add(i * j + j, new Answers(questions.get(i)));
            }
        }
    }

    public Test(Tests test, Iterable<Questions> questions, Iterable<Answers> answers) {
        this.test = test;
        this.questions = new ArrayList<Questions>();
        questions.forEach(this.questions::add);
        this.answers = new ArrayList<Answers>();
        answers.forEach(this.answers::add);
    }
    @Override
    public String toString(){
        return test.toString() + "\n" + questions.toString() + "\n" + answers.toString() + "\n";
    }
}
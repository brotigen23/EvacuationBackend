package org.ivkrylov.EvacuationBackend.Services;

import org.ivkrylov.EvacuationBackend.Enitities.Tests.Answers;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Tests;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.AnswersRepository;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.QuestionsRepository;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.TestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TestsService {
    @Autowired
    TestsRepository testsRepository;
    @Autowired
    QuestionsRepository questionsRepository;
    @Autowired
    AnswersRepository answersRepository;

    public Iterable<Tests> getTests(){
        return testsRepository.findAll();
    }

    public Optional<Tests> getTestByID(int id){
        return testsRepository.findById(id);
    }

    public Iterable<Questions> getQuestions(int testID){

        return questionsRepository.findByTest(testsRepository.findById(testID));
    }
    public Iterable<Answers> getAnswers(int testID){
        return answersRepository.findByQuestionIn(getQuestions(testID));
    }
}

package org.ivkrylov.EvacuationBackend.Services;

import org.apache.catalina.User;
import org.ivkrylov.EvacuationBackend.DTO.TestPost;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Answers;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.TestResults;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Tests;
import org.ivkrylov.EvacuationBackend.Enitities.Users;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.AnswersRepository;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.QuestionsRepository;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.TestResultsRepository;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.TestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class TestsService {
    @Autowired
    TestsRepository testsRepository;
    @Autowired
    QuestionsRepository questionsRepository;
    @Autowired
    AnswersRepository answersRepository;
    @Autowired
    TestResultsRepository testResultsRepository;

    @Autowired
    UsersService usersService;

    public Iterable<Tests> findAllTests(){
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

    public String save(TestPost testPost){
        System.out.println(testPost);
        for (int i = 0; i < testPost.getAnswer().length; i++){

            if(usersService.getUserByUsername(testPost.getUser()).isEmpty()){
                usersService.save(testPost.getUser());
            }
            Users user = usersService.getUserByUsername(testPost.getUser()).get();
            Answers answer = answersRepository.findById(testPost.getAnswer()[i]).get();
            Date date = new Date();
            TestResults testResults = new TestResults(user, answer, date);
            testResultsRepository.save(testResults);
        }
        return null;
    }
}

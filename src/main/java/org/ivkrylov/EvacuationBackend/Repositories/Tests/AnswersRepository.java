package org.ivkrylov.EvacuationBackend.Repositories.Tests;

import org.ivkrylov.EvacuationBackend.Enitities.Tests.Answers;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AnswersRepository  extends CrudRepository<Answers, Integer> {
    public Iterable<Answers> findByQuestionIn(Iterable<Questions> questionsList);
}

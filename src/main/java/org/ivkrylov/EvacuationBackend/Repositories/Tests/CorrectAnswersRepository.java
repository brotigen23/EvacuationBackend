package org.ivkrylov.EvacuationBackend.Repositories.Tests;

import org.ivkrylov.EvacuationBackend.Enitities.Tests.CorrectAnswers;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.springframework.data.repository.CrudRepository;

public interface CorrectAnswersRepository extends CrudRepository<CorrectAnswers, Integer> {
    public Iterable<CorrectAnswers> findAllByQuestion(Questions question);
}

package org.ivkrylov.EvacuationBackend.Repositories.Tests;

import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Tests;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface QuestionsRepository extends CrudRepository<Questions, Integer> {
    Iterable<Questions> findByTest(Optional<Tests> test);
}

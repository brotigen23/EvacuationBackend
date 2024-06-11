package org.ivkrylov.EvacuationBackend.Repositories.Tests;

import org.ivkrylov.EvacuationBackend.Enitities.Tests.TestResults;
import org.springframework.data.repository.CrudRepository;

public interface TestResultsRepository extends CrudRepository<TestResults, Integer> {
}

package org.ivkrylov.EvacuationBackend.Repositories;

import org.ivkrylov.EvacuationBackend.Enitities.Articles;
import org.springframework.data.repository.CrudRepository;

public interface ArticlesRepository extends CrudRepository<Articles, Integer> {
}

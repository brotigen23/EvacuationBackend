package org.ivkrylov.EvacuationBackend.Services;

import org.ivkrylov.EvacuationBackend.Enitities.Articles;
import org.ivkrylov.EvacuationBackend.Repositories.ArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticlesService {
    @Autowired
    ArticlesRepository repo;

    public Iterable<Articles> getAll(){
        return repo.findAll();
    }
}

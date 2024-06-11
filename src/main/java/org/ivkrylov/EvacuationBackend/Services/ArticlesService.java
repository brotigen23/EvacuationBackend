package org.ivkrylov.EvacuationBackend.Services;

import org.ivkrylov.EvacuationBackend.Enitities.Articles;
import org.ivkrylov.EvacuationBackend.Repositories.ArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ArticlesService {
    @Autowired
    ArticlesRepository repo;

    public Iterable<Articles> findAll(){
        return repo.findAll();
    }
    public Optional<Articles> findById(int id){
        return repo.findById(id);
    }
    public void save(Articles article){
        repo.save(article);
    }

    public void delete(Articles article){
        repo.delete(article);
    }
}

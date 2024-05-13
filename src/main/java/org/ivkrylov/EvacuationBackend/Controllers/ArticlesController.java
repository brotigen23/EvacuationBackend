package org.ivkrylov.EvacuationBackend.Controllers;

import org.ivkrylov.EvacuationBackend.Enitities.Articles;
import org.ivkrylov.EvacuationBackend.Services.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/articles")
public class ArticlesController {
    @Autowired
    ArticlesService service;
    @GetMapping
    public Iterable<Articles> getAll(){
        return service.getAll();
    }
}

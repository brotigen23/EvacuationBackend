package org.ivkrylov.EvacuationBackend.Controllers;

import org.ivkrylov.EvacuationBackend.Enitities.Articles;
import org.ivkrylov.EvacuationBackend.Services.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/articles")
public class ArticlesController {
    @Autowired
    ArticlesService service;
    @GetMapping
    public String articles(Model model){
        model.addAttribute("articles", service.findAll());
        return "pages/articles/articles";
    }
    @GetMapping("/{id}")
    public String getArticleById(@PathVariable int id, Model model){
        service.findById(id).ifPresent(o -> model.addAttribute("article", o));
        return "pages/articles/article";
    }
}

package org.ivkrylov.EvacuationBackend.Controllers.Admin;


import org.ivkrylov.EvacuationBackend.DTO.TestPost;
import org.ivkrylov.EvacuationBackend.Enitities.Articles;
import org.ivkrylov.EvacuationBackend.Services.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin/articles")
public class ArticlesControllerAdmin {
    @Autowired
    ArticlesService service;

    @GetMapping
    public String getArticles(Model model){
        model.addAttribute("articles", service.findAll());
        return "pages/admin/articles/articles";
    }

    @GetMapping("/{id}")
    public String getArticleById(@PathVariable int id, Model model){
        service.findById(id).ifPresent(o -> model.addAttribute("article", o));
        return "pages/admin/articles/article";
    }

    @GetMapping("/new")
    public String createNewArticle(Model model){
        model.addAttribute("article", new Articles());
        return "pages/admin/articles/article";
    }

    @GetMapping("/delete/{id}")
    public String deleteArticle(@PathVariable int id, Model model){
        service.findById(id).ifPresent(o -> service.delete(o));
        return "redirect:/admin/articles";
    }

    @PostMapping("/post")
    public String postArticle(@ModelAttribute("testPost") Articles article){
        service.save(article);
        return "redirect:/admin/articles";
    }
}

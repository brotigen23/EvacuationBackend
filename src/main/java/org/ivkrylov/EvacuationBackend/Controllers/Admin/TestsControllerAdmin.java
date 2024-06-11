package org.ivkrylov.EvacuationBackend.Controllers.Admin;

import org.ivkrylov.EvacuationBackend.Services.TestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/tests")
public class TestsControllerAdmin {
    @Autowired
    TestsService service;
    @GetMapping
    public String getTests(Model model){
        model.addAttribute("tests", service.findAllTests());
        return "pages/admin/tests/tests";
    }
}

package org.ivkrylov.EvacuationBackend.Enitities.Tests;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.ivkrylov.EvacuationBackend.Enitities.Users;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.TestResultsRepository;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.TestsRepository;

import java.util.Date;
import java.util.Optional;


/*
    ЗАПИСЬ СЛЕДУЮЩАЯ:
    ID | ID ПОЛЬЗОВАТЕЛЯ | ID ОТВЕТА КОТОРЫЙ ВЫБРАЛ ПОЛЬЗОВАТЕЛЬ | ДАТА
 */
@Entity
@Getter
@Setter
public class TestResults {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "serial")
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_userID")
    private Users user;
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_answerID")
    private Answers answer;
    public TestResults(){}

    public TestResults(Users user, Answers answer, Date date) {
        this.user = user;
        this.answer = answer;
        this.date = date;
    }
}

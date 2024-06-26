package org.ivkrylov.EvacuationBackend.Enitities.Tests;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CorrectAnswers {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "serial")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_questionID")
    private Questions question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_answerID")
    private Answers answer;

}

package org.ivkrylov.EvacuationBackend.Enitities.Tests;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Questions {
    @Id
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkTestID")
    private Tests test;
    private String question;
}

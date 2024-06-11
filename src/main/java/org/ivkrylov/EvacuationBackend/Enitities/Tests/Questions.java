package org.ivkrylov.EvacuationBackend.Enitities.Tests;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "serial")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fkTestID")
    private Tests test;

    public int getId() {
        return id;
    }

    private String question;

    public Questions(Tests test){
        this.test = test;
    }

    public Questions(Tests test, String question) {
        this.test = test;
        this.question = question;
    }

    @Override
    public String toString() {
        return "id:" + id + ", test id : " + test.getId() + ", question: " + question + "\n";
    }
}

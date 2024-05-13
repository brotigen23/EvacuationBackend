package org.ivkrylov.EvacuationBackend.Enitities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Articles {

    @Id
    private int id;
    private String name;
    private String content;
}

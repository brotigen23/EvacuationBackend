package org.ivkrylov.EvacuationBackend.DTO;

import lombok.Getter;
import lombok.Setter;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Answers;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Tests;

import java.util.ArrayList;
import java.util.Optional;

@Getter
@Setter
public class Test{
    public Tests t;
    public ArrayList<Questions> q;
    public ArrayList<Answers> a;


}
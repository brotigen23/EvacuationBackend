package org.ivkrylov.EvacuationBackend.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@NoArgsConstructor
public class TestPost {
    public String getUser() {
        return user;
    }

    public int[] getAnswer() {
        return answer;
    }

    private String user;
    private int[] answer;

    public TestPost(int countQuestions){
        answer = new int[countQuestions];
    }

    @Override
    public String toString(){
        String str = "user: " + user;
        for (int i = 0; i < answer.length; i++){
            str += "\nanswer: " + String.valueOf(i) + " is " + String.valueOf(answer[i]) + "\n";
        }
        return str;
    }
}

package org.ivkrylov.EvacuationBackend.Services;



import org.apache.catalina.User;
import org.ivkrylov.EvacuationBackend.Enitities.Users;
import org.ivkrylov.EvacuationBackend.Repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersService {
    @Autowired
    UsersRepository usersRepository;

    public Optional<Users> getUserByUsername(String username){
        return usersRepository.findByUserName(username);
    }

    public Users save(String userName){
        Users user = new Users(userName);
        return usersRepository.save(user);
    }
}

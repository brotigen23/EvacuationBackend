package org.ivkrylov.EvacuationBackend.Repositories;

import org.ivkrylov.EvacuationBackend.Enitities.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UsersRepository extends CrudRepository<Users, Integer> {

    public Optional<Users> findByUserName(String userName);
}

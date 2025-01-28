package com.to_do.main;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "tasks", path = "tasks")
public interface TaskRepository extends MongoRepository<Task, String> {

  List<Task> findByTitle(@Param("title") String title);

}
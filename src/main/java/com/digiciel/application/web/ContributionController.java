package com.digiciel.application.web;

import java.util.List;
import java.util.Optional;

import com.digiciel.domain.model.Contribution;
import com.digiciel.domain.service.ContributionService;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/api/contributions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ContributionController {

  private ContributionService contributionService;

  @Inject
  public ContributionController(final ContributionService contributionService) {
    this.contributionService = contributionService;
  }

  @GET
  @Path("/all")
  public List<Contribution> all() {
    return contributionService.getAll();
  }

  @POST
  @Path("/add")
  @Transactional
  public Contribution create(final Contribution domain) {
    return contributionService.create(domain);
  }

  @PUT
  @Path("/update")
  @Transactional
  public Contribution update(final Contribution domain) {
    return contributionService.update(domain);
  }

  @DELETE
  @Path("/delete/{id}")
  @Transactional
  public void delete(final Long id) {
    contributionService.delete(id);
  }

  @GET
  @Path("/find/{id}")
  public Response findById(final Long id) {
    Optional<Contribution> ret = contributionService.findById(id);
    if (ret.isPresent()) {
      return Response.ok(ret.get()).build();
    }
    return Response.status(Status.NOT_FOUND).entity("Contribution introuvable").build();
  }
}

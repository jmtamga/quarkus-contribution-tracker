package com.digiciel.domain.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.digiciel.common.ContributionCategory;

/**
 * @author jean-marie
 */
public class Contribution {

  private Long id;

  private LocalDateTime date;

  private LocalDateTime dateModication;

  private BigDecimal amount;

  private String beneficiary;

  private String donor;

  private ContributionCategory category;

  private String description;

  public Long getId() {
    return id;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  public LocalDateTime getDate() {
    return date;
  }

  public void setDate(final LocalDateTime date) {
    this.date = date;
  }

  public LocalDateTime getDateModication() {
    return dateModication;
  }

  public void setDateModication(final LocalDateTime dateModication) {
    this.dateModication = dateModication;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(final BigDecimal amount) {
    this.amount = amount;
  }

  public String getBeneficiary() {
    return beneficiary;
  }

  public void setBeneficiary(final String beneficiary) {
    this.beneficiary = beneficiary;
  }

  public String getDonor() {
    return donor;
  }

  public void setDonor(final String donor) {
    this.donor = donor;
  }

  public ContributionCategory getCategory() {
    return category;
  }

  public void setCategory(final ContributionCategory category) {
    this.category = category;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(final String description) {
    this.description = description;
  }
}

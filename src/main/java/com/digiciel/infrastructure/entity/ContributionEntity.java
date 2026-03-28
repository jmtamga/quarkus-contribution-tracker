package com.digiciel.infrastructure.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.digiciel.common.ContributionCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * @author jean-marie
 */
@Entity
@Table(name = "CONTRIBUTION_TBL", schema = "contribution_management")
public class ContributionEntity {

  @Id
  @GeneratedValue
  @Column(name = "CONTRIBUTION_ID")
  private Long id;

  @Column(name = "CONTRIBUTION_DTE_CREATED")
  private LocalDateTime date;

  @Column(name = "CONTRIBUTION_DTE_MODIFIED")
  private LocalDateTime dateModication;

  @Column(name = "CONTRIBUTION_AMOUNT")
  private BigDecimal amount;

  @Column(name = "CONTRIBUTION_BENEFICIARY")
  private String beneficiary;

  @Column(name = "CONTRIBUTION_DONOR")
  private String donor;

  @Column(name = "CONTRIBUTION_CATEGORY")
  @Enumerated(EnumType.STRING)
  private ContributionCategory category;

  @Column(name = "CONTRIBUTION_DESCRIPTION")
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

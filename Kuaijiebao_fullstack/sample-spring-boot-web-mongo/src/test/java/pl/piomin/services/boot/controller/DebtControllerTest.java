package pl.piomin.services.boot.controller;

import org.hibernate.validator.constraints.NotEmpty;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import pl.piomin.services.boot.Application;
import pl.piomin.services.boot.data.AfRepository;
import pl.piomin.services.boot.data.CalenderUserRepository;
import pl.piomin.services.boot.data.DebtRepository;
import pl.piomin.services.boot.data.UserSpecRepository;
import pl.piomin.services.boot.model.*;
import pl.piomin.services.boot.payload.ApplyLoanForm;
import pl.piomin.services.boot.payload.SignupForm;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static pl.piomin.services.boot.model.Status.ACCEPTED;
import static pl.piomin.services.boot.model.Status.SUBMITTED;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = Application.class)
@AutoConfigureMockMvc
public class DebtControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private DebtRepository repository;

    @Autowired
    CalenderUserRepository cuRepository;

    @Autowired
    UserSpecRepository ucRepository;



    @Before
    public void initDb() {

        CalendarUser user1=new CalendarUser();
        user1.setId(333);
        UserSpec spec1=new UserSpec();
        spec1.setId("333");
        spec1.setUserId(333);
        cuRepository.save(user1);
        ucRepository.save(spec1);
        Debt debtBeforeAudit=new Debt();
        debtBeforeAudit.setId("333");
        debtBeforeAudit.setDebtSideId(333);
        debtBeforeAudit.setLoanAmount(1500);
        debtBeforeAudit.setDescription("imdescription");
        debtBeforeAudit.setNumRepayments(15);
        debtBeforeAudit.setRate(18);
        LocalDateTime now=LocalDateTime.now();
        debtBeforeAudit.setAppliedDate(now.minusMonths(2));
        debtBeforeAudit.setStatus(SUBMITTED);
        repository.save(debtBeforeAudit);


        CalendarUser user2=new CalendarUser();
        user2.setId(555);
        UserSpec spec2=new UserSpec();
        spec2.setId("555");
        spec2.setUserId(555);
        cuRepository.save(user2);
        ucRepository.save(spec2);
        Debt debtAfterAccepted=new Debt();
        debtAfterAccepted.setId("555");
        debtAfterAccepted.setDebtSideId(555);
        debtAfterAccepted.setLoanAmount(1500);
        debtAfterAccepted.setDescription("imdescription");
        debtAfterAccepted.setNumRepayments(15);
        debtAfterAccepted.setRate(18);
        debtAfterAccepted.setAppliedDate(now.minusMonths(2));
        debtAfterAccepted.setStatus(ACCEPTED);
        debtAfterAccepted.setCreditSideId(555);
        debtAfterAccepted.setAuditedDate(now);
        debtAfterAccepted.setAmountPerMonth(100);
        debtAfterAccepted.setNextDue(now.plusMonths(1));
        debtAfterAccepted.setFinalDue(now.plusMonths(15));
        debtAfterAccepted.setAmountRepayments(15);
        debtAfterAccepted.setRepaidAmount(0);
        debtAfterAccepted.setRepaidNum(0);
        repository.save(debtAfterAccepted);
    }

    @After
    public void resetDb() {
        repository.deleteAll();
    }

    @Test
    public void whenFindAll_thenStatus200() throws IOException, Exception {
        Debt debt=new Debt();
        debt.setId("222");
        debt.setDebtSideId(222);
        mvc.perform(get("/debt/").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidDebtSideId_whenFindByDebtSideId_thenStatus200() throws IOException, Exception {
        Debt debt=new Debt();
        debt.setId("222");
        debt.setDebtSideId(222);
        mvc.perform(get("/debt/debtSide/"+"222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidDebtSideId_whenFindByStatusAndDebtSideId_thenStatus200() throws IOException, Exception {
        Debt debt=new Debt();
        debt.setId("222");
        debt.setDebtSideId(222);
        mvc.perform(get("/debt/status?status=SUBMITTED"+"&id=222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidDebtSideId_whenFindAcceptedOfUserId_thenStatus200() throws IOException, Exception {
        Debt debt=new Debt();
        debt.setId("222");
        debt.setDebtSideId(222);
        mvc.perform(get("/debt/accepted/"+"222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidDebtSideId_whenFindExceptAcceptedOfUserId_thenStatus200() throws IOException, Exception {
        Debt debt=new Debt();
        debt.setId("222");
        debt.setDebtSideId(222);
        mvc.perform(get("/debt/exceptaccepted/"+"222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void whenApply_thenContainsDebt() throws IOException, Exception {
        ApplyLoanForm form=new ApplyLoanForm(222,1500,"imdescription",15);
        mvc.perform(post("/debt/apply").contentType(MediaType.APPLICATION_JSON).content(JsonUtil.toJson(form)));

        List<Debt> found = repository.findAll();
        assertThat(found).extracting(Debt::getDebtSideId).contains(222);
    }

    @Test
    public void givenValidDebt_whenAcceptDebt_thenStatus200() throws IOException, Exception {
        mvc.perform(get("/debt/accept/333/333").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidDebt_whenRepayDebt_thenStatus200() throws IOException, Exception {
        mvc.perform(get("/debt/repay/555/555/555").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }


}
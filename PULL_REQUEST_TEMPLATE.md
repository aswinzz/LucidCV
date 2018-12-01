
**Checklist**

- [ Yes ] My branch is up-to-date with the upstream `master` branch.
- [ Yes ] I have added necessary documentation (if appropriate).

**Which issue does this PR fix?**:
fixes: issue #1

Adds validation to the education and experience dates in the form. 
Validation is added to the extra rows of input generated on the click of "Add" button as well.
Fixed a bug in educationfn() where croom variable was not properly concatenated with html elements for the name tag.



**Why do we need this PR?**:

Date validation is necessary to prevent users from accidentaly entering incorrect data.

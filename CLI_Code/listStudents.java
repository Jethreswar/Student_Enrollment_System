package main.src;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import main.utilities.printResultSet;
import main.utilities.scannerHelper;
import oracle.jdbc.OracleTypes;

import main.utilities.exceptionhelper;
public class listStudents {

    private static String classID ;
    // Handle the listing of students in a class
    public static void handleListStudents(Connection conn) throws SQLException {
        try {
            display.displaySpecificTable("classes",conn);
            // Display the classes table
            scannerHelper.readString();
            System.out.print("\nChoose class id from above table: ");
            // Get the class id
            classID = scannerHelper.readString();
            // Call the method to get the students in the class
            getStudentsList(conn);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    public static void getStudentsList(Connection conn) throws SQLException {
        try {
            // Call the stored procedure to get the students in a class
            CallableStatement callableStatement = conn
            .prepareCall("{ ? = call student_management_pkg_jdbc.get_students_in_class(?) }");
            // Set the procedure parameters
            callableStatement.setString(2, classID);
            callableStatement.registerOutParameter(1, OracleTypes.CURSOR);
            callableStatement.execute();
            // Get the result set
            ResultSet resultSet = (ResultSet) callableStatement.getObject(1);
            // Display the result set
            printResultSet.printObject(resultSet);
        }
        catch(SQLException e) {
            exceptionhelper.handleSQLException(e);
        }   
        catch (Exception e) {
            System.out.println(e.getMessage());

        }
    }
}
